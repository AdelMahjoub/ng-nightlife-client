import { NightLifeCoordinationPage } from './app.po';

describe('night-life-coordination App', () => {
  let page: NightLifeCoordinationPage;

  beforeEach(() => {
    page = new NightLifeCoordinationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
