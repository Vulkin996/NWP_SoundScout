import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveArtistComponent } from './remove-artist.component';

describe('RemoveArtistComponent', () => {
  let component: RemoveArtistComponent;
  let fixture: ComponentFixture<RemoveArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveArtistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
