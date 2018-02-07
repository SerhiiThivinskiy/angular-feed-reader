import { MocTestAppPage } from './app.po';

describe('moc-test-app App', () => {
  let page: MocTestAppPage;

  beforeEach(() => {
    page = new MocTestAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
