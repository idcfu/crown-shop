interface ICategory {
  heading: string;
  imageURL: string;
}

type ICategories = (ICategory & { id: number })[];

export { ICategories, ICategory };
