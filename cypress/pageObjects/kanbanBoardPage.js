export default class KanbanBoardPage {
    getPage() {
        return cy.get('#root');
    }

    getAddToDoTicket() {
        return cy.get(':nth-child(1) > .sc-AxheI > [data-testid="add-ticket-button"]');
    }

    getAddInProgressTicket() {
        return cy.get(':nth-child(2) > .sc-AxheI > [data-testid="add-ticket-button"]');
    }

    getAddDoneTicket() {
        return cy.get(':nth-child(3) > .sc-AxheI > [data-testid="add-ticket-button"]')
    }

    getTicket() {
        return cy.get('[data-testid="ticket"]');
    }

    getDeleteTicketButton() {
        return cy.get('[data-testid="delete-ticket-button"]');
    }

    getToDoTicketsNo() {
        return cy.get(':nth-child(1) > .sc-AxheI > .sc-fzozJi');
    }

    getInProgressTicketsNo() {
        return cy.get(':nth-child(2) > .sc-AxheI > .sc-fzozJi');
    }

    getDoneTicketsNo() {
        return cy.get(':nth-child(3) > .sc-AxheI > .sc-fzozJi');
    }

    getToDoBoard() {
        return cy.get(':nth-child(1) > .sc-fzoLsD');
    }

    getInProgressBoard() {
        return cy.get(':nth-child(2) > .sc-fzoLsD');
    }

    getDoneBoard() {
        return cy.get(':nth-child(3) > .sc-fzoLsD');
    }
}