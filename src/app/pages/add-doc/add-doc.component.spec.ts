import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocComponent } from './add-doc.component';

describe('AddDocComponent', () => {
  let component: AddDocComponent;
  let fixture: ComponentFixture<AddDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
