import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExistComponent } from './dialog-exist.component';

describe('DialogExistComponent', () => {
  let component: DialogExistComponent;
  let fixture: ComponentFixture<DialogExistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
