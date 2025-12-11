import { StaticImageData } from "next/image";

export interface CompanyInfoType {
  name: string;
  description: string;
  image: StaticImageData;
  externalLink: string;
  foundedYear: string;
}
