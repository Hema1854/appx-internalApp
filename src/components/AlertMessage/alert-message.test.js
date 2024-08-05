import AlertMessage from "./alert-message";
import { render,screen } from "@testing-library/react";

describe('alert-message', () => {
    it('alert component with warning msg', () => {
        render(<AlertMessage 
            isWarning = {true}
            alertTitle = {'warning'}
            alertMsg = {'test warning'}
        />);
        expect(screen.getByText('test warning')).toBeInTheDocument();
    });

    it('alert component with success msg', () => {
        render(<AlertMessage 
            isSuccess = {true}
            alertTitle = {'success'}
            alertMsg = {'test success msg'}
        />);
        expect(screen.getByText('test success msg')).toBeInTheDocument();
    });

    it('alert component with failure msg', () => {
        render(<AlertMessage 
            isFailure = {true}
            alertTitle = {'error'}
            alertMsg = {'test failure msg'}
        />);
        expect(screen.getByText('test failure msg')).toBeInTheDocument();
    });
});

