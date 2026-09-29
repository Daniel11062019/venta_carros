import { TestBed } from '@angular/core/testing';
import { TableComponent } from './table';

describe('TableComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TableComponent as any);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });
});
