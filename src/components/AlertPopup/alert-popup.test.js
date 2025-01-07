import AlertPopup from "./alert-popup";
import { screen,render } from "@testing-library/react";

describe('alert popup test cases', () => {
    it('alert popup component should render properly', () => {
        render(<AlertPopup 
            openStatus = {true} 
            alertObj = {{}}
            buttonOrder = {-1}
            changeOpenStatus = {jest.fn()}
            saveAction = {jest.fn()}
            cancelAction = {jest.fn()}
            />
            );
            
            expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('alert title ', () => {
        render(<AlertPopup 
            openStatus = {true} 
            alertObj = {{
                        icon : 'fa fa-check',
                        iconColor : 'green',
                        title : 'titletext'
                        }}
            buttonOrder = {-1}
            changeOpenStatus = {jest.fn()}
            saveAction = {jest.fn()}
            cancelAction = {jest.fn()}
            />
            );
            
            expect(screen.getByText('titletext')).toBeInTheDocument();
    });

    it('alert popup submit button', () => {
        render(<AlertPopup 
            openStatus = {true} 
            alertObj = {{
                        icon : 'fa fa-check',
                        iconColor : 'green',
                        title : 'titletext',
                        submitButtton : 'Yes'
                        }}
            buttonOrder = {-1}
            changeOpenStatus = {jest.fn()}
            saveAction = {jest.fn()}
            cancelAction = {jest.fn()}
            />
            );            
            expect(screen.getByRole('button', {name :'Yes'})).toBeInTheDocument();
    });

    it('alert popup cancel button', () => {
        render(<AlertPopup 
            openStatus = {true} 
            alertObj = {{
                        icon : 'fa fa-check',
                        iconColor : 'green',
                        title : 'titletext',
                        submitButtton : 'Yes',
                        cancelButton : 'No'
                        }}
            buttonOrder = {-1}
            changeOpenStatus = {jest.fn()}
            saveAction = {jest.fn()}
            cancelAction = {jest.fn()}
            />
            );
            expect(screen.getByRole('button', {name :'No'})).toBeInTheDocument();
    });

    it('alert popup message ', () => {
        render(<AlertPopup 
            openStatus = {true} 
            alertObj = {{
                        icon : 'fa fa-check',
                        iconColor : 'green',
                        title : 'titletext',
                        message : 'testmessage',
                        submitButtton : 'Yes',
                        cancelButton : 'No'
                        }}
            buttonOrder = {-1}
            changeOpenStatus = {jest.fn()}
            saveAction = {jest.fn()}
            cancelAction = {jest.fn()}
            />
            );            
            expect(screen.getByText('testmessage')).toBeInTheDocument();
    });

});

