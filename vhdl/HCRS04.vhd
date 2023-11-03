library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_ARITH.ALL;
use IEEE.STD_LOGIC_UNSIGNED.ALL;
use IEEE.NUMERIC_STD.ALL; -- Add this line

entity HCRS04 is
    Port (
        clk : in STD_LOGIC;
        echo : in STD_LOGIC;
        Trigger : out STD_LOGIC;
        an0 : out STD_LOGIC;
        infrared_sensor : in STD_LOGIC; -- Señal de entrada para el sensor infrarrojo
        display_out : out STD_LOGIC_VECTOR(6 downto 0);
--================================================================================        UART_TX     : out STD_LOGIC;
		  reset : in STD_LOGIC;
		  tx : out STD_LOGIC;  -- UART transmit signal
--================================================================================
		  UART_TX  : out STD_LOGIC;
		  Start_Transmit : in STD_LOGIC;
        Data_Valid  : out STD_LOGIC;
        Data        : out STD_LOGIC_VECTOR(4 downto 0);
--================================================================================
        led_distance : out STD_LOGIC; -- LED controlado por la distancia
        led_infrared : out STD_LOGIC; -- LED controlado por el sensor infrarrojo
        led_distance2 : out STD_LOGIC; 
        led_infrared2 : out STD_LOGIC 
    );
end HCRS04;


architecture Behavioral of HCRS04 is

COMPONENT TriggerGen
	PORT(
		clk : IN std_logic;          
		trigger : OUT std_logic
		);
	END COMPONENT;

COMPONENT counter
	PORT(
		clk : IN std_logic;
		reset : IN std_logic;
		enable : IN std_logic;          
		q : OUT std_logic_vector(19 downto 0)
		);
	END COMPONENT;
	
COMPONENT distance_calculation
	PORT(
		echo_count : IN std_logic_vector(19 downto 0);          
		distance : OUT std_logic_vector(3 downto 0)
		);
	END COMPONENT;

COMPONENT display_decoder
	PORT(
		distance_in : IN std_logic_vector(3 downto 0);          
		display_out : OUT std_logic_vector(6 downto 0)
		);
	END COMPONENT;
	
	


--=================================================================	

signal Trigger_out: std_logic;
signal echo_counter1 : STD_LOGIC_VECTOR (19 downto 0);
signal echo_count : STD_LOGIC_VECTOR (19 downto 0);
signal distance_bits : std_logic_vector(3 downto 0);
signal led_distance_signal : std_logic := '0'; -- Control del LED de distancia
signal led_infrared_signal : std_logic := '0'; -- Control del LED de infrarrojo

--=================================================================	
signal TX_Clock  : STD_LOGIC := '1';  -- Inicializa TX_Clock en 1
signal Bit_Count : integer := 0;     -- Inicializa Bit_Count en 0
signal Data_Reg  : STD_LOGIC_VECTOR(4 downto 0);
--=================================================================	
signal uart_data : STD_LOGIC_VECTOR(3 downto 0);  
signal uart_bit_counter : integer range 0 to 3 := 0; 
signal delay_counter : integer := 0;
signal tx_internal : STD_LOGIC;
--=================================================================	

begin

Inst_TriggerGen: TriggerGen PORT MAP(
		clk,
		Trigger_out 
	);
	
Inst_counter: counter PORT MAP(
		clk,
		Trigger_out,
		echo,
		echo_counter1 
	);
	
	process(echo) begin
		if falling_edge(echo) then
			echo_count <= echo_counter1;
		end if;
	
	end process;
	
Inst_distance_calculation: distance_calculation PORT MAP(
		echo_count,
		distance_bits 
	);
	
Inst_display_decoder: display_decoder PORT MAP(
		distance_bits,
		display_out 
	);
	
--==============================================================	

--=================================================================

    process(echo, infrared_sensor) begin
        if falling_edge(echo) then
            echo_count <= echo_counter1;
            -- Calculate distance here and update the distance_value
            -- Example calculation (update this part based on your actual calculation):
            -- distance_value <= calculate_distance(echo_count);
            if echo_count > 19000 then
                led_distance_signal <= '0'; -- Si la distancia es menor de 20 cm, encender el LED de distancia
            else
                led_distance_signal <= '1'; -- De lo contrario, apagar el LED de distancia
            end if;
            
            -- Control del LED de infrarrojo
            if infrared_sensor = '1' then
                led_infrared_signal <= '0'; -- Encender el LED de infrarrojo si el sensor está activado
            else
                led_infrared_signal <= '1'; -- Apagar el LED de infrarrojo si el sensor no está activado
            end if;

            -- Update uart_tx_data to send the updated distance_value
        end if;
    end process;

--=================================================================    -- Agregamos el proceso para controlar la transmisión UART

    process(clk)
    begin
        if rising_edge(clk) then
            if Start_Transmit = '1' then
                Data_Valid <= '1';
                Bit_Count <= 0;
                Data_Reg <= '0' & distance_bits; -- Agregar un bit 0 a la izquierda para que tenga 5 bits de ancho
            else
                Data_Valid <= '0';
            end if;
            
            if Bit_Count = 0 then
                UART_TX <= '0';  -- Start bit
                Data <= Data_Reg;
            else
                UART_TX <= Data_Reg(Bit_Count - 1);
            end if;
            
            Bit_Count <= Bit_Count + 1;
            
            if Bit_Count = 5 then
                UART_TX <= '1';  -- Stop bit
                Bit_Count <= 0;
            end if;
        end if;
    end process;

led_distance <= led_distance_signal; -- Salida del LED de distancia
led_infrared <= led_infrared_signal; -- Salida del LED de infrarrojo
led_distance2 <= led_distance_signal; 
led_infrared2 <= led_infrared_signal; 
Trigger <= Trigger_out;
an0 <= '1';
	 
--==============================================================	  

  process (clk, reset)
  begin
  
  uart_data <= distance_bits;
  
    if reset = '1' then
      uart_bit_counter <= 0;  -- Reset UART bit counter
      delay_counter <= 0;  -- Reset delay counter
      tx_internal <= '1';  -- Initialize the internal transmit signal to high
    elsif rising_edge(clk) then
      if delay_counter = 0 then
			  -- Transmit the current bit
			  tx_internal <= uart_data(uart_bit_counter);

			  -- Increment the bit counter
			  if uart_bit_counter = 3 then
				 uart_bit_counter <= 0;  -- Reset bit counter after the stop bit
			  else
				 uart_bit_counter <= uart_bit_counter + 1;
			  end if;

			  delay_counter <= 1250;  -- 1/9600 of a second for 9600 bps
      else
			delay_counter <= delay_counter - 1;
      end if;
    end if;
  end process;

tx <= tx_internal;  -- Connect the internal transmit signal to the physical transmit signal 
	 
--=================================================================


end Behavioral;