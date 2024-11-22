export interface IRegistration {
  id?: string;
  profileImage: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  attendance: string;
  adults: 0;
  numberOfKids: 0;
  message: string;
  kidsAges:Array<number>;
}
