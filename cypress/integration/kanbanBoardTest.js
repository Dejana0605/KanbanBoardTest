import KanbanBoardPage from "../pageObjects/kanbanBoardPage";
import {generateRandomAlphaNumeric} from "../support/utils";
import '@4tw/cypress-drag-drop';
import "cypress-real-events/support";

context('Kanban Board Test', () => {
    const kanbanBoardPage = new KanbanBoardPage();
    const text = generateRandomAlphaNumeric(10);
    const editedText = generateRandomAlphaNumeric(7)

    beforeEach('Visit Kanban board', () => {
       cy.kanban();
   });

    it('Create, edit, hover over and delete tickets', () => {
        createAndValidateTicket(text, kanbanBoardPage.getAddToDoTicket());

        //edit ticket
        kanbanBoardPage.getTicket()
            .dblclick()
            .clear()
            .type(editedText);
        kanbanBoardPage.getTicket().should('have.text', '✕'+ editedText);

        //check if delete button is visible on hover
        kanbanBoardPage.getTicket().realHover();
        kanbanBoardPage.getDeleteTicketButton().should('be.visible');

        deleteATicket();

        createAndValidateTicket(text, kanbanBoardPage.getAddInProgressTicket());
        deleteATicket();

        createAndValidateTicket(text, kanbanBoardPage.getAddDoneTicket());
        deleteATicket();
    });

    it('Drag and drop ticket', () => {
        createAndValidateTicket(text,kanbanBoardPage.getAddToDoTicket());

        kanbanBoardPage.getTicket().drag(':nth-child(2) > .sc-fzoLsD');
        kanbanBoardPage.getTicket().should('have.class', 'cETdWL');
        kanbanBoardPage.getTicket().should('not.have.class', 'haeNPs');
        kanbanBoardPage.getTicket().should('not.have.class', 'KfkWX');

        kanbanBoardPage.getTicket().drag(':nth-child(3) > .sc-fzoLsD');
        kanbanBoardPage.getTicket().should('have.class', 'haeNPs');
        kanbanBoardPage.getTicket().should('not.have.class', 'cETdWL');
        kanbanBoardPage.getTicket().should('not.have.class', 'KfkWX');

        kanbanBoardPage.getTicket().drag(':nth-child(1) > .sc-fzoLsD');
        cy.wait(500);
        kanbanBoardPage.getTicket().should('have.class', 'KfkWX');
        kanbanBoardPage.getTicket().should('not.have.class', 'haeNPs');
        kanbanBoardPage.getTicket().should('not.have.class', 'cETdWL');
    });

    it('Check the number of tickets in each column', () => {
        createMultipleTickets(3 , kanbanBoardPage.getAddToDoTicket(), text);

        kanbanBoardPage.getToDoBoard().find('[data-testid="ticket"]').then(tickets => {
            const ticketCount = Cypress.$(tickets).length;
            kanbanBoardPage.getToDoTicketsNo().should('have.text', '(' + ticketCount + ')');
            expect(tickets).to.have.length(ticketCount);
        });

        createMultipleTickets(2 , kanbanBoardPage.getAddInProgressTicket());

        kanbanBoardPage.getInProgressBoard().find('[data-testid="ticket"]').then(tickets => {
            const ticketCount = Cypress.$(tickets).length;
            kanbanBoardPage.getInProgressTicketsNo().should('have.text', '(' + ticketCount + ')');
            expect(tickets).to.have.length(ticketCount);
        });

        createMultipleTickets(5, kanbanBoardPage.getAddDoneTicket());

        kanbanBoardPage.getDoneBoard().find('[data-testid="ticket"]').then(tickets => {
            const ticketCount = Cypress.$(tickets).length;
            kanbanBoardPage.getDoneTicketsNo().should('have.text', '(' + ticketCount + ')');
            expect(tickets).to.have.length(ticketCount);
        });
    });

    const createAndValidateTicket = (text, progress) => {
        progress.click();
        kanbanBoardPage.getTicket().type(text);
        kanbanBoardPage.getPage().click();
        kanbanBoardPage.getTicket().should('have.text', '✕'+ text);
    }

    const deleteATicket = () => {
        kanbanBoardPage.getTicket().realHover();
        kanbanBoardPage.getDeleteTicketButton().click();
        kanbanBoardPage.getTicket().should('not.exist');
    }

    const createMultipleTickets = (number, board, text) => {
        for(let i = 0; i < number; i++){
            board.click();
        }
    }
});