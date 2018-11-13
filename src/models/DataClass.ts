interface IA {
  name: string;
  description: string;
}

interface IB extends IA {
  b: number;
}

type ADT = IA | IB;

class DataClass {
  private readonly data: Partial<ADT>;
  constructor(data: Partial<ADT>) {
    this.data = data;
  }
}

const dc = new DataClass({ name: 'John', description: 'Whatever' });
