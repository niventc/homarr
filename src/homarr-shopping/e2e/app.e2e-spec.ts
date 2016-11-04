import { HomarrShoppingPage } from './app.po';

describe('homarr-shopping App', function() {
  let page: HomarrShoppingPage;

  beforeEach(() => {
    page = new HomarrShoppingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
