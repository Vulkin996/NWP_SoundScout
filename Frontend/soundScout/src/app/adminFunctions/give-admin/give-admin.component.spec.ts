import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveAdminComponent } from './give-admin.component';

describe('GiveAdminComponent', () => {
  let component: GiveAdminComponent;
  let fixture: ComponentFixture<GiveAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiveAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
