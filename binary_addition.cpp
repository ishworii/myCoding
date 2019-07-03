/*
This simple program demonstrates 8-bit binary addition in C++
It takes two inputs in decimals, converts them to binary, adds
them using full bit adder logic and displays the result in both
binary and decimal. 
*/


#include<iostream>
#include<vector>
#include<conio.h>
#include<cmath>


using namespace std;

//---------FUNCTION DECLARATION------------------------//
void display_line();
void check_status(int,int); //checking if the result exceeds 8-bit barrier
vector<int> decimal_to_binary(int);
void display_binary(vector<int>);
vector<int> add_binary(vector<int>,vector<int>);
vector<int> subtract_binary(vector<int>,vector<int>);
int binary_to_decimal(vector<int>);



int main()
{
	int num1,num2,decimal_sum;
	vector<int> bin_vec1,bin_vec2,result_binary_sum,result_binary_diff;
	cout<<"Enter two numbers"<<endl;
	cin>>num1>>num2;
	check_status(num1,num2);
	bin_vec1=decimal_to_binary(num1);
	bin_vec2=decimal_to_binary(num2);
	
	
	cout<<endl<<endl<<"Binary Addition"<<endl<<endl<<endl;
	display_binary(bin_vec1);
	display_binary(bin_vec2);
	result_binary_sum=add_binary(bin_vec1,bin_vec2);
	display_line();
	display_binary(result_binary_sum);
	decimal_sum=binary_to_decimal(result_binary_sum);
	cout<<endl<<"The sum is  " <<decimal_sum<<endl;
	display_line();

	getch();
	return 0;
}

//---------------FUNCTIONS DEFINITION----------------//	


void display_line()
{
	for(int i=0;i<80;i++)
	{
		cout<<"-";
	}
	cout<<endl;
}


void check_status(int num1,int num2)
{
	if(num1+num2>255)
	{
		cout<<"The entered data exceeds the 8-bit limit.."<<endl;
		exit(1);
	}
}

vector<int> decimal_to_binary(int num)
{
	vector<int> temp(8);
	for(int i=7;i>=0;i--)
	{
		int rem=num%2;
		temp[i]=rem;
		num=num/2;
	}
    return temp;
}

int binary_to_decimal(vector<int> binary_vector)
{
	int num=0;
	for(int i=0;i<binary_vector.size();i++)
	{
		num+=binary_vector[i]*pow(2,7-i);
		
	}
	
	return num;
}

void display_binary(vector<int> bin_vector)
{
	for(int i=0;i<bin_vector.size();i++)
	{
		cout<<" "<<bin_vector[i]<<" ";
	}
	cout<<endl;
}

vector<int> add_binary(vector<int> bin1,vector<int> bin2)
{
	vector<int> sum_vector(8);
	int carry=0;
	for(int i=7;i>=0;i--)
	{
		sum_vector[i]=bin1[i]^bin2[i]^carry;
		carry=bin1[i]&&bin2[i]||bin1[i]&&carry||bin2[i]&&carry;
	}
	return sum_vector;
}

