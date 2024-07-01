import { FormEvent } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/generated/graphql-types";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";


const LoginForm: React.FC = () => {

  const { toast } = useToast();
  const router = useRouter();
  const [login] = useLoginMutation();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputs = Object.fromEntries(formData.entries());
    const { email, password } = inputs;
    if (typeof email !== "string" || typeof password !== "string") return;
      
    login({ 
      variables: { userData: { email, password } },
      onCompleted: data => {
        localStorage.setItem("profile", data.login);
        const userName = JSON.parse(data.login).userName;
        toast({
          title: "Succès",
          description: `Bienvenue ${userName}`,
          variant: "default"
        });
        router.push("/");
      },
      onError: () => {
        toast({
          title: "Erreur",
          description: "Email ou mot de passe saisie incorrect.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <form 
      className={
        clsx(
          "relative",
          "mt-[100px]",
          "w-full sm:w-[400px]",
          "space-y-6"
        )
      }
      onSubmit={e => onSubmit(e)}
    >
      <div className="space-y-2">
        <Label>Email</Label>
          <Input 
            name="email"
            type="email" 
            placeholder="Saisissez votre email..." 
          />
      </div>
      <div className="space-y-2">
        <Label>Mot de passe</Label>
          <Input 
            name="password"
            type="password" 
            placeholder="Saisissez un mot de passe..." 
        />
      </div>
      <Button 
        type="submit"
        className="float-right mt-6"
      >
        <span>Se connecter</span>
      </Button>
    </form>
  );
};

export default LoginForm;