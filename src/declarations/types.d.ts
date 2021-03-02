namespace ts {
  declare type match = import('react-router').match & {
    params: {
      id?: string,
      query?: string,
      page?: string,
    }
  };

  declare type Titles = '' | 'Mr' | 'Miss' | 'Mrs' | "Madame" | "Monsieur" | "Mademoiselle";

  declare type DirectoryListing = Readonly<{
    email: string,
    fname: string,
    id: number,
    lname: string,
    phone: string,
    photo: string,
    title: Titles,
    uuid: string,
  }>;

  declare type Directory = DirectoryListing[];

  declare type ApiResult = Readonly<{
    id: {
      value: string,
    },
    name: {
      first: string,
      last: string,
      title: Titles,
    },
    email: string,
    phone: string,
    picture: {
      large: string,
    },
  }>;
}
