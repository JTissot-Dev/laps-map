import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { fr } from "date-fns/locale";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useSignupMutation } from "@/generated/graphql-types";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useAuthStateContext } from "@/contexts/authContext";


const signupSchema = z.object({
  firstName: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères",
  }).max(55, {
    message: "Le prénom doit contenir au maximum 55 caractères",
  }),
  lastName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }).max(55, {
    message: "Le nom doit contenir au maximum 55 caractères",
  }),
  birthDay: z.string({
    message: "La date de naissance saisie n'est pas valide",
  }),
  email: z.string().email({
    message: "L'adresse email saisie n'est pas valide",
  }),
  password: z.string().min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères",
  }).refine(value => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(value);
  }, {
    message: "Le mot de passe doit contenir une majuscule, un chiffre et un caractère spécial",
  }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe saisies doivent être identiques",
  path: ['confirmPassword']
});


const SignupForm: React.FC = () => {

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDay: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const { dispatch } = useAuthStateContext();
  const [formStep, setFormStep] = useState<number>(1);
  const { toast } = useToast();
  const router = useRouter();
  const [signup] = useSignupMutation();

  const onSubmit = (formValues: z.infer<typeof signupSchema>) => {
    const userData = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      birthDay: formValues.birthDay,
      email: formValues.email,
      password: formValues.password,
    };
    signup({ 
      variables: { userData: userData },
      onCompleted: data => {
        dispatch({ type: "signup", authenticatedUser: data.signup })
        toast({
          title: "Succès",
          description: "Votre compte a été créé avec succès",
          variant: "default"
        });
        router.push("/");
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Erreur lors de l'inscription, veuillez vérifier les données saisies",
          variant: "destructive"
        });
      }
    });
  };

  const handleStep = (step: number) => {
    switch (step) {
      case 1:
        form.trigger(["firstName", "lastName"]).then(isValid => {
          isValid && setFormStep(2);
        });
        break;
      case 2:
        form.trigger(["birthDay", "email"]).then(isValid => {
          isValid && setFormStep(3);
        });
        break;
      case 3:
        form.handleSubmit(onSubmit)();
        break;
    };
  };

  return (
    <Form {...form}>
      <form 
        className={
          clsx(
            "relative",
            "mt-[100px]",
            "w-full sm:w-[400px]"
            
          )
        }
      >
        {formStep === 1 && 
          <div className="space-y-6" key="step-1">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="Saisissez votre prénom..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Saisissez votre nom..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        }
        {formStep === 2 &&
          <div className="space-y-6" key="step-2">
            <FormField
              control={form.control}
              name="birthDay"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date de naissance</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={clsx(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: fr })
                          ) : (
                            <span>Sélectionnez une date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        locale={ fr }
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={(date) => {
                          if (!date) return;
                          field.onChange(date.toISOString().slice(0, 10));
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Saisissez votre email..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        }
        {formStep === 3 && 
          <div className="space-y-6" key="step-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Saisissez un mot de passe..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer le mot de passe</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Confirmer le mot de passe..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        }
        <Button 
          type="button"
          className="float-right mt-6"
          onClick={() => handleStep(formStep)}
        >
          <span>Suivant</span>
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;