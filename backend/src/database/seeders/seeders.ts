import appDataSource from "../AppDataSource";
import Difficulty from "../../models/Difficulty/Difficulty";
import User from "../../models/User/User";

const seedDatabase = async () => {
  await appDataSource.initialize();

  // Drop previous data
    
  await appDataSource
  .createQueryBuilder()
  .delete()
  .from('Lap')
  .execute();
  
  await appDataSource
    .createQueryBuilder()
    .delete()
    .from('User')
    .execute();

  await appDataSource
  .createQueryBuilder()
  .delete()
  .from('Difficulty')
  .execute();

  // Create data
  await appDataSource
    .createQueryBuilder()
    .insert()
    .into('Difficulty')
    .values([
        { level: "Facile" },
        { level: "Modéré" },
        { level: "Difficile" }
    ])
    .execute();

  await appDataSource
    .createQueryBuilder()
    .insert()
    .into('User')
    .values([
        { firstName: "Jean", lastName: "Dupont", email: "jean@dupont.fr", password: "password", birthDay: "1990-05-21" }
    ])
    .execute();
  
  const easyLevel = await Difficulty.findOneBy({ level: "Facile" });
  const moderateLevel = await Difficulty.findOneBy({ level: "Modéré" });
  const hardLevel = await Difficulty.findOneBy({ level: "Difficile" });
  const user = await User.findOneBy({ email: "jean@dupont.fr" });

  await appDataSource
    .createQueryBuilder()
    .insert()
    .into('Lap')
    .values([
        { 
          name: "Lap 1",
          duration: "08:48:26", 
          geometry: () => "ST_GeomFromText('LineString(45.744243 4.932391,45.742266 4.941661,45.739810 4.953677)')",
          difficulty: easyLevel.id,
          user: user.id,
          createdAt: "2024-05-21 19:04:07.000000"
        },
        { 
          name: "Lap 2",
          duration: "08:48:26", 
          geometry: () => "ST_GeomFromText('LineString(45.72595153486207 4.640111632665933, 45.72532802668992 4.63937836058286, 45.7251274835129 4.638465199226989, 45.72552750405336 4.63731278690296, 45.72543549161639 4.636843343816357, 45.72452513568673 4.63692372389607, 45.72378789539648 4.636188046107621, 45.7233306037036 4.635621613819048, 45.72273695168862 4.635109501428114, 45.72274626378611 4.634109518384943, 45.72475642285629 4.631750290300111, 45.7251672336233 4.630600358852388, 45.72923401712929 4.625680795450897, 45.72988227733673 4.624158345531784)')",
          difficulty: hardLevel.id,
          user: user.id,
          createdAt: "2024-05-21 19:04:07.000000"
        },
        { 
          name: "Lap 3",
          duration: "08:48:26", 
          geometry: () => "ST_GeomFromText('LineString(45.73902069184386 4.619453992020601, 45.73916044071592 4.62041422483874, 45.73943797401125 4.622408296250833, 45.73963637201067 4.624565549307162, 45.73962472621051 4.626350915500888, 45.73920426602735 4.627024807327209, 45.73830618960805 4.627529155313443, 45.73767946065237 4.627527427535602, 45.73685588325946 4.62794163452517, 45.73653864198103 4.628376699730752, 45.73639711396837 4.629595854930486, 45.73651046323496 4.630064902494135)')",
          difficulty: easyLevel.id,
          user: user.id,
          createdAt: "2024-05-21 19:04:07.000000"
        },
        { 
          name: "Lap 4",
          duration: "08:48:26", 
          geometry: () => "ST_GeomFromText('LineString(45.73638674326904 4.617416562825285, 45.73655482825899 4.618758050679206, 45.73724174097152 4.620229771402975, 45.73762138063233 4.621424996973131, 45.737623140893 4.622850974619235, 45.73710338876291 4.624210226150725, 45.73728988250392 4.625166312238525, 45.7379180108653 4.625485909596303, 45.73785923920884 4.626011007303878, 45.73749762867114 4.626288401100611, 45.73656855901373 4.626389007793468, 45.73582678359834 4.627333631067529, 45.73544696581057 4.628041995158593, 45.73537590111587 4.628396991037267, 45.73515126462313 4.629348084072675, 45.73449620760572 4.63002085556611, 45.73431495380001 4.630720628767895)')",
          difficulty: moderateLevel.id,
          user: user.id,
          createdAt: "2024-05-21 19:04:07.000000"
        },
        { 
          name: "Lap 5",
          duration: "08:48:26", 
          geometry: () => "ST_GeomFromText('LineString(45.73933064516579 4.632155933924902, 45.73902496213277 4.632878608120228, 45.73853707851211 4.63332811439523, 45.73786662765949 4.63318504371075, 45.73709979264197 4.632325253243548, 45.73641055934296 4.631991863736367, 45.73585120901372 4.631889163298172, 45.73509114218829 4.632024095397787, 45.73473136897449 4.632510093502327, 45.73435773042315 4.63342403724913, 45.73400731027701 4.633996252184005)')",
          difficulty: easyLevel.id,
          user: user.id,
          createdAt: "2024-05-21 19:04:07.000000"
        },
        { 
          name: "Lap 6",
          duration: "08:48:26", 
          geometry: () => "ST_GeomFromText('LineString(45.73014157870876 4.620725533590737, 45.73042317550424 4.621795122167944, 45.73089897272506 4.622717504032712, 45.73136690070243 4.623339326911939, 45.73176494891645 4.623958505828858, 45.73175668463379 4.624993808096354, 45.73147578451053 4.626447177390547, 45.73096239962537 4.62734062919147, 45.7302872240473 4.62792112527795, 45.72932876017973 4.628561869710122, 45.72910948827491 4.628858846733594, 45.72892222324806 4.629236645428003, 45.72876666576944 4.629561795298192, 45.72860728015189 4.630050288293246, 45.72819888730807 4.631244503189778)')",
          difficulty: hardLevel.id,
          user: user.id,
          createdAt: "2024-05-21 19:04:07.000000"
        },
        { 
          name: "Lap 7",
          duration: "08:48:26", 
          geometry: () => "ST_GeomFromText('LineString(45.73176551946707 4.630802853494382, 45.73199284915983 4.632636901079086, 45.73240368673401 4.634356496464211, 45.73238929606337 4.636413779601498, 45.73208108296972 4.637506172678774, 45.73155417766149 4.638178914866131, 45.73137750593571 4.638758010116524, 45.73194223767301 4.64040301338007)')",
          difficulty: hardLevel.id,
          user: user.id,
          createdAt: "2024-05-21 19:04:07.000000"
        }
    ])
    .execute();
  await appDataSource.destroy();
};

seedDatabase();
