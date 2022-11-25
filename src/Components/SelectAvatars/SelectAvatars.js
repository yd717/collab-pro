import Crew1 from "../../Assets/images/crew1.png";
import Crew2 from "../../Assets/images/crew2.png";
import Crew3 from "../../Assets/images/crew3.png";
import Crew4 from "../../Assets/images/crew4.png";
import Crew5 from "../../Assets/images/crew5.png";
import Crew6 from "../../Assets/images/crew6.png";
import Crew7 from "../../Assets/images/crew7.png";



const AvatarArray = [
 Crew1,
 Crew2,
 Crew3,
 Crew4,
 Crew5,
 Crew6,
 Crew7,

];
const Avatar = (key) => {
  let avatar;
  try{
    avatar = AvatarArray[key];
  }catch(e){
    avatar = AvatarArray[0];
  }
  return avatar; 
};

const AllAvatars = () => {
  return AvatarArray;
};

export { AllAvatars };

export default Avatar;
