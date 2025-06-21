import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dropdown from '../components/dropdown';

describe('CryptoSelect', () => {
  const options = [
    { id: 'btc', name: 'Bitcoin', symbol: 'btc', image: '/btc.png' },
    { id: 'eth', name: 'Ethereum', symbol: 'eth', image: '/eth.png' },
  ];
  const syncOptions=[{
    value: 'price',
    label: 'Price',
    name: 'Price',
  },
  {
    value: 'marketCap',
    label: 'Market Cap',
    name: 'Market Cap',
  },]
  it('renders and allows selecting an option', async () => {
    const handleChange = vi.fn();

    render(
      <Dropdown
        isAsync
        options={options}
        onChange={handleChange}
        placeholder="Select coin"
      />
    );

    const input = screen.getByTestId('crypto-select');
    await userEvent.click(input);

    const ethOption = await screen.findByText(/Ethereum/i);
    await userEvent.click(ethOption);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({ symbol: 'eth' }),
      expect.objectContaining({ action: 'select-option' })
    );
    
      });
      it('renders safely with no options', () => {
        render(<Dropdown isAsync placeholder="Select" options={[]} onChange={vi.fn()} />);
        expect(screen.getByTestId('crypto-select')).toBeInTheDocument();
      });
      it('does not call onChange when nothing is selected', async () => {
        const handleChange = vi.fn();
        render(<Dropdown placeholder="Select" options={[]} onChange={handleChange} />);
      
        expect(handleChange).not.toHaveBeenCalled();
      });
      it('does not crash if onChange is not provided', async () => {
        render(<Dropdown isAsync placeholder="Select" options={[]} />); 
        const input = screen.getByTestId('crypto-select');
        await userEvent.click(input);
        expect(input).toBeInTheDocument();
      });
      it('renders option even if image or symbol is missing', async () => {
        const options = [{ id: 'btc', name: 'Bitcoin' }]; 
        render(<Dropdown isAsync options={options} onChange={vi.fn()} placeholder="Select coin" />);
      
        const input =  screen.getByTestId('crypto-select');
        await userEvent.click(input);
        expect(await screen.findByTestId('coin-name-Bitcoin')).toBeInTheDocument();
      });
      
      it('shows loading indicator when loadOptions is triggered by typing', async () => {
        const loadOptions = vi.fn(() => Promise.resolve([]));
        
        render(
          <Dropdown
            isAsync
            loadOptions={loadOptions}
            placeholder="Search coins"
          />
        );
      
        const input = screen.getByRole('combobox'); 
        await userEvent.type(input, 'eth'); 
      
        expect(loadOptions).toHaveBeenCalledWith('eth', expect.any(Function));
      });
      
      
      it('renders sync select and allows selecting an option', async () => {
        const handleChange = vi.fn();
    
        render(
          <Dropdown
            isAsync={false}
            options={syncOptions}
            onChange={handleChange}
            placeholder="Select coin"
            testId={"sync-select"}
          />
        );
    
        const select = screen.getByTestId('sync-select');
        await userEvent.click(select);
        
      
        const option = await screen.findByText('price', { exact: false });

        await userEvent.click(option);
    
        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ value: 'price' }));
      });
      it('selects first option by default if enabled', () => {
        const handleChange = vi.fn();
    
        render(
          <Dropdown
            isAsync={false}
            options={syncOptions}
            onChange={handleChange}
            selectFirstOptionByDefault={true}
          />
        );
    
        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ value: 'price' }));
      });
      
});
