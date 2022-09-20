interface ISearch {
  id: string;
  title: string;
  content: {
    summary: string;
    description: string;
    body: string;
  };
  textSearch: string;
}

export default ISearch;
