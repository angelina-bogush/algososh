import { Circle, CircleProps } from "./circle";
import { ElementStates } from "../../../types/element-states";
import { render, } from '@testing-library/react';

describe('Circle component', () => {
    const defaultProps = {
        state: ElementStates.Default,
        letter: ''
    }
    it('render Circle component without letter', () => {
        const circle = render(<Circle {...defaultProps} />);
        expect(circle.container.firstChild).toMatchSnapshot()
    })
    it('render Circle component with letter', () => {
        const circle = render(<Circle {...defaultProps} letter='123' />);
        expect(circle.container.firstChild).toMatchSnapshot()
    })
    it('render Circle component with head as string', () => {
        const circle = render(<Circle {...defaultProps} head="Head" />);
        expect(circle.container.firstChild).toMatchSnapshot()
    });
    it('render Circle component with head as React element', () => {
        const circle = render(<Circle {...defaultProps} head={<Circle letter='React Component' />} />);
        expect(circle.container.firstChild).toMatchSnapshot()
    });
    it('render Circle component with tail as string', () => {
        const circle = render(<Circle {...defaultProps} tail="Tail" />);
        expect(circle.container.firstChild).toMatchSnapshot()
    });
    it('render Circle component with tail as React element', () => {
        const circle = render(<Circle {...defaultProps} tail={<p>Tail as element</p>} />);
        expect(circle.container.firstChild).toMatchSnapshot()
    });
    it('render Circle component with index', () => {
        const circle = render(<Circle {...defaultProps} index={111} />);
        expect(circle.container.firstChild).toMatchSnapshot()
    });
    it('render Circle component with isSmall = true', () => {
        const circle = render(<Circle {...defaultProps} isSmall={true} />);
        expect(circle.container.firstChild).toMatchSnapshot()
    });
    it('render Circle component with state default', () => {
        const circle = render(<Circle {...defaultProps} />);
        expect(circle.container.firstChild).toMatchSnapshot()
    });
    it('render Circle component with state changing', () => {
        const circle = render(<Circle {...defaultProps} state={ElementStates.Changing} />);
        expect(circle.container.firstChild).toMatchSnapshot()
    });
    it('render Circle component with state modified', () => {
        const circle = render(<Circle {...defaultProps} state={ElementStates.Modified} />);
        expect(circle.container.firstChild).toMatchSnapshot()
    });
    it('render Circle component without letter', () => {
        const circle = render(<Circle {...defaultProps} />);
        expect(circle.queryByTestId('letter')).toBeFalsy()
    })
    it('render Circle component with letter', () => {
        const circle = render(<Circle {...defaultProps} letter='123' />);
        expect(circle.getByText('123')).toBeInTheDocument()
    })
    it('render Circle component with head as string', () => {
        const circle = render(<Circle {...defaultProps} head="Head" />);
        expect(circle.getByText('Head')).toBeInTheDocument();
    });
    it('render Circle component with head as React element', () => {
        const circle = render(<Circle {...defaultProps} head={<Circle letter='React Component' />} />);
        expect(circle.getByText('React Component')).toBeInTheDocument();
    });
    it('render Circle component with tail as string', () => {
        const circle = render(<Circle {...defaultProps} tail="Tail" />);
        expect(circle.getByText('Tail')).toBeInTheDocument();
    });
    it('render Circle component with tail as React element', () => {
        const circle = render(<Circle {...defaultProps} tail={<p>Tail as element</p>} />);
        expect(circle.getByText('Tail as element')).toBeInTheDocument();
    });
    it('render Circle component with index', () => {
        const circle = render(<Circle {...defaultProps} index={111} />);
        expect(circle.getByText(111)).toBeInTheDocument();
    });
    it('render Circle component with isSmall = true', () => {
        const circle = render(<Circle {...defaultProps} isSmall={true} />);
        expect(circle.container.querySelector('.circle')).toHaveClass('small')
    });
    it('render Circle component with state default', () => {
        const circle = render(<Circle {...defaultProps} />);
        expect(circle.container.querySelector('.circle')).toHaveClass('default')
    });
    it('render Circle component with state changing', () => {
        const circle = render(<Circle {...defaultProps} state={ElementStates.Changing} />);
        expect(circle.container.querySelector('.circle')).toHaveClass('changing')
    });
    it('render Circle component with state modified', () => {
        const circle = render(<Circle {...defaultProps} state={ElementStates.Modified} />);
        expect(circle.container.querySelector('.circle')).toHaveClass('modified')
    });

})