import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyDataHeaderComponent } from './key-data-header.component';

describe('KeyDataHeaderComponent', () => {
  let component: KeyDataHeaderComponent;
  let fixture: ComponentFixture<KeyDataHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyDataHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyDataHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
