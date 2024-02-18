
import { render, fireEvent } from '@testing-library/react';
import { Button, ButtonProps } from './button';

describe('Button component', () => {
    const defaultProps: ButtonProps = {
      text: '',
      type: 'button',
    };
    it('renders button with text correctly', () => {
      const wrapper = render(<Button {...defaultProps} text='Click me'/>);
      expect(wrapper.container.firstChild).toMatchSnapshot()
    });
    it('renders button without text correctly', () => {
        const { container } = render(<Button {...defaultProps} text={undefined} />);
        expect(container.firstChild).toMatchSnapshot()
      });
    
  
    it('renders disabled button correctly', () => {
      const component = render(<Button {...defaultProps} disabled={true} />);
      expect(component.container.firstChild).toMatchSnapshot()
    }); 
  
    it('renders loading button correctly', () => {
      const component = render(<Button {...defaultProps} isLoader={true} />);
      expect(component.container.firstChild).toMatchSnapshot()
    });
  
    it('calls onClick callback when button is clicked', () => {
      const onClickMock = jest.fn();
      const button = render(<Button {...defaultProps} onClick={onClickMock} text='Click me'/>);
      fireEvent.click(button.getByText('Click me'));
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
  
    it('renders button with text correctly', () => {
      const wrapper = render(<Button {...defaultProps} text='Click me'/>);
      expect(wrapper.getByText('Click me')).toBeInTheDocument();
    });
    it('renders button without text correctly', () => {
        const { container } = render(<Button {...defaultProps} text={undefined} />);
        expect(container.querySelector('p')).toBeNull();
      });
    
  
    it('renders disabled button correctly', () => {
      const component = render(<Button {...defaultProps} disabled={true} />);
      expect(component.getByRole('button')).toBeDisabled();
    }); 
  
    it('renders loading button correctly', () => {
      const component = render(<Button {...defaultProps} isLoader={true} />);
      expect(component.getByAltText('Загрузка.')).toBeInTheDocument();
    });

  });
  