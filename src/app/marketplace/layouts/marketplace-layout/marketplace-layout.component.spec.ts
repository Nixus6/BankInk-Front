import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceLayoutComponent } from './marketplace-layout.component';

describe('MarketplaceLayoutComponent', () => {
  let component: MarketplaceLayoutComponent;
  let fixture: ComponentFixture<MarketplaceLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketplaceLayoutComponent]
    });
    fixture = TestBed.createComponent(MarketplaceLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
