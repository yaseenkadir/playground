import { Injectable } from '@nestjs/common';

@Injectable()
export class FooService {
  private readonly foos: Foo[];
  private nextId;

  public constructor() {
    this.foos = [];
    this.nextId = 1;
  }

  public createFoo(req: CreateFooRequest): CreateFooResponse {
    const foo = { id: this.generateId() };
    this.foos.push(foo);
    return { foo };
  }

  public findFoos(): FindFoosResponse {
    return { foos: this.foos };
  }

  private generateId(): string {
    return (this.nextId++).toString();
  }
}

export class CreateFooRequest {}

export class CreateFooResponse {
  readonly foo: Foo;
}

export class Foo {
  readonly id: string;
}

export class FindFoosResponse {
  readonly foos: Foo[];
}
