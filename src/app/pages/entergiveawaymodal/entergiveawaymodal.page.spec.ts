import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntergiveawaymodalPage } from './entergiveawaymodal.page';

describe('EntergiveawaymodalPage', () => {
  let component: EntergiveawaymodalPage;
  let fixture: ComponentFixture<EntergiveawaymodalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EntergiveawaymodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntergiveawaymodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
