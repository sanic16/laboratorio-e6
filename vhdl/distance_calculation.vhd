library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use ieee.std_logic_unsigned.all;


entity distance_calculation is
port(
echo_count : in STD_LOGIC_VECTOR (19 downto 0);
distance : out  STD_LOGIC_VECTOR (3 downto 0)
);
end distance_calculation;

architecture Behavioral of distance_calculation is

begin

Distance <="0000" when (echo_count < 2900) else --0cm
			  "0001" when (echo_count > 2900 and echo_count < 8700) else --3cm
			  "0010" when (echo_count > 8700 and echo_count < 14500) else --3-5cm
			  "0011" when (echo_count > 14500 and echo_count < 21750) else --5-7.5cm
			  "0100" when (echo_count > 21750  and echo_count < 27550) else --7.5-9.5cm
			  "0101" when (echo_count > 27550  and echo_count < 30450) else --9.5-10.5cm
			  "0110" when (echo_count > 30450 and echo_count < 33350) else --10.5-11.5cm
			  "0111" when (echo_count > 33350 and echo_count < 37700) else --11.5-13cm
			  "1000" when (echo_count > 37700 and echo_count < 40600) else --13-14cm
			  "1001" when (echo_count > 40600 and echo_count < 46400) else --14-16cm
			  "1010" when (echo_count > 46400 and echo_count < 49300) else --16-17cm
			  "1011" when (echo_count > 49300 and echo_count < 52200) else --17-18cm; 
			  "1100" when (echo_count > 52200 and echo_count < 55100) else --18-19cm; 
			  "1101" when (echo_count > 55100 and echo_count <58000) else --19-20cm; 
			  "1110" when (echo_count > 58000 and echo_count < 63800) else --20-22cm; 
			  "1111";--more than 22cm
end Behavioral;
