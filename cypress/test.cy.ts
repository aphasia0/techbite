import { PageHeaderComponent } from "src/app/pages/page-header/page-header.component"
describe('test.cy.ts', () => {
  it('playground', () => {
    // mount the component
    cy.mount('<app-page-header title="Hi There" subtitle="Nice to meet you" image="https://picsum.photos/200"></app-page-header>', {
      declarations: [PageHeaderComponent],
    })
  })
})