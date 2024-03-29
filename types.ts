 export type Quiz = {
    id: string
    title: string,
    image: string,
    questions_count: number,
    difficulty: string,
    description: string,
    time: number,
    is_active: number,
    category_id:number,
    category: any,
    user_id:number,
  }

  export type Personal = {
    name:string,
    surname: string,
    email: string,
    phone: number,
}
export type Company = {
  name: string,
  nip: number,
  regon: number,
  address: {
      city: string,
      postcode: string,
      street: string,
      building_number: number,
      house_number: number,
  }
}

export type Financial = {
  iban: string;
  bank_name: string;
  swift: string;
}

export type User = {
  id:any
  name: string,
  surname: string,
  phone: null | string,
  email: string,
  points: number,
  avatar_path: null | string,
}

export type InvitedUser = {
  name: string
  is_premium: boolean,
  avatar_path: null | string,
}

export type selectOption ={
  value: string | number,
  label: string,
}

export type whiteRetangle = {
  text?: string;
  text1?: string;
  notext?: string;
  istextNo?: boolean;
  mode?: string;
  des?: string;
  link?: string;
  maxlength?: any;
  lastIcon?:string;
  firstIcon?:string;
  wrap?:string 
  question?: string
  answer?: {
    answer: string,
    correct: number,
  }[];
type?: string,
  placeholder: string,
  value?: any;
template?:string
  }