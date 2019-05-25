export class Api {
  public fetchFormula = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );

    const result = await response.json();

    return result;
  };
}
