import { Test, TestingModule } from '@nestjs/testing';
import { FindFoosResponse, FooService } from './foo.service';

describe('FooService', () => {
  let service: FooService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FooService],
    }).compile();

    service = module.get<FooService>(FooService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findFoos returns empty', () => {
    expect(service.findFoos()).toEqual({ foos: [] });
  });

  it('createFoo creates foo', () => {
    expect(service.createFoo({})).toEqual({ foo: { id: '1' } });
  });

  it('createFoo creates foo that can be found', () => {
    service.createFoo({});
    expect(service.findFoos()).toEqual({ foos: [{ id: '1' }] });
  });
});
