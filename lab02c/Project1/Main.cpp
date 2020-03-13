/*
	Tran, Trung
	Byun, Kloud
	Nguyen, Danny

	February 12, 2020

	CS A200
	Lab 2
*/

#include "Graph.h"

#include <vector>
#include <string>

const int CAP = 10;

using namespace std;

void print(const Graph& graph, const vector<string>& people);
void setUpGraph(const vector<string>& people,
	const vector<vector<int>>& friends, Graph& graph);

int main()
{
	{
		vector<string> people = {
			//0.........1............2......3.......4.........5.......6......
			"Bill", "Cinderella", "Jane", "Jill", "Martha", "Sean", "Susan" };

		int numOfVertices = 7;

		vector<vector<int>> friends = {
			//0, 1, 2, 3, 4, 5, 6
			{ 0, 0, 1, 1, 0, 1, 0 },  //0 Bill
			{ 0, 0, 0, 1, 1, 1, 1 },  //1 Cinderella
			{ 1, 0, 0, 0, 1, 0, 1 },  //2 Jane	
			{ 1, 1, 0, 0, 0, 0, 0 },  //3 Jill
			{ 0, 1, 1, 0, 0, 0, 0 },  //4 Martha
			{ 1, 1, 0, 0, 0, 0, 0 },  //5 Sean
			{ 0, 1, 1, 0, 0, 0, 0 },  //6 Susan
		};
		std::cout << "Start\n";
		{
			Graph graph(7);
			graph.createGraph(friends, people);

			//*
			Graph graph2(graph);
			Graph graph3;
			graph3 = graph2;
			//*/

			//*
			Graph graph4(move(graph2));
			Graph graph5;
			graph5 = move(graph3);
			//*/

			Graph graph6 = graph4;
			Graph graph7 = std::move(graph5);

			cout << "MEMBERS: ";
			graph.printVertices();
			cout << endl;

			cout << "\nFRIENDS\n";
			for (const string& i : people) {
				graph.printAdjacentVertices(i);
				cout << endl;
			}

			cout << "\nBFS\n";
			for (const string& i : people) {
				graph.printBFS(i);
				cout << endl;
			}

			cout << endl;
		}
		std::cout << "End\n";
	}

	vector<string> people = {
		//0.........1............2...
		"Bill", "Cinderella", "Jane" };

	vector<vector<int>> friends = {
		//0, 1, 2, 3
		{ 0, 0, 1, 0 },  //0 Bill
		{ 0, 0, 1, 0 },  //1 Cinderella
		{ 1, 1, 0, 0 },  //2 Jane	
		{ 0, 0, 0, 0 },  //3

	};

	/*******************************************
	* TEST: Copy constructor
	*******************************************/
	{
		cout << "\nTEST: Copy constructor\n";
		Graph graph(4);
		setUpGraph(people, friends, graph);
		cout << "\nCreate new graph: Graph newGraph(graph);\n";
		Graph newGraph(graph);
		cout << "\nPrint old graph...\n";
		print(graph, people);
		cout << "\nPrint new graph...\n";
		print(newGraph, people);
		cout << "\nModify old graph...\n";
		graph.modifyForTesting();
		cout << "\nPrint old graph (should have been modified)...\n";
		print(graph, people);
		cout << "\nPrint new graph (should not have been modified)...\n";
		print(newGraph, people);
	}

	cout << "\n=============================================\n";

	/*******************************************
	* TEST: Move constructor
	* Note that there are two statements at the
	* end of this section that will crash the
	* program. Uncomment them to check it it
	* does so.
	*******************************************/
	{
		cout << "\nTEST: Move constructor\n";
		Graph graph(4);
		setUpGraph(people, friends, graph);
		cout << "\nCreate new graph: Graph newGraph = move(graph);\n";
		Graph newGraph = move(graph);
		cout << "\nPrint new graph...\n";
		print(newGraph, people);
		cout << "\n*** NOTE: Try it again, but this time "
			<< "uncomment the next two statements.\n";
		//cout << "\nPrint old graph...\n"; // should crash the program
		//print(graph, people); // not crashing the program hmm...
	}

	cout << "\n=============================================\n";

	/*******************************************
	* TEST: Overloaded assignment operator
	*******************************************/
	{
		cout << "\nTEST: Overloaded assignment constructor\n";
		Graph graph(4);
		setUpGraph(people, friends, graph);
		// Need to create a different graph
		vector<string> newPeople = {
			//0.........1............2.......3.......4.....
			"Bill", "Cinderella", "Jane", "Mindy", "Lana" };
		vector<vector<int>> newFriends = {
			//0, 1, 2, 3, 4
			{ 0, 0, 1, 0, 1 },  //0 Bill
			{ 0, 0, 1, 1, 1 },  //1 Cinderella
			{ 1, 1, 0, 0, 0 },  //2 Jane	
			{ 0, 0, 0, 0, 1 },  //3 Mindy
			{ 1, 0, 0, 1, 0 },  //4 Lana
		};
		cout << "\nCreate new graph: Graph newGraph(graph);\n";
		Graph newGraph(5);
		newGraph.createGraph(newFriends, newPeople);
		cout << "\nPrint old graph...\n";
		print(graph, people);
		cout << "\nPrint new graph...\n";
		print(newGraph, newPeople);
		cout << "\nCopy old graph into new graph...\n";
		newGraph = graph;
		cout << "\nPrint old graph...\n";
		print(graph, people);
		cout << "\nPrint new graph...\n";
		print(newGraph, people);
		cout << "\nModify old graph...\n";
		graph.modifyForTesting();
		cout << "\nPrint old graph (should have been modified)...\n";
		print(graph, people);
		cout << "\nPrint new graph (should not have been modified)...\n";
		print(newGraph, people);
	}

	cout << "\n=============================================\n";

	/*******************************************
	* TEST: Move assignment operator
	* Note that there are two statements at the
	* end of this section that will crash the
	* program. Uncomment them to check it it
	* does so.
	*******************************************/
	{
		cout << "\nTEST: Move assignment constructor\n";
		Graph graph(4);
		setUpGraph(people, friends, graph);
		// Need to create a different graph
		vector<string> newPeople = {
			//0.........1............2.......3.......4.....
			"Bill", "Cinderella", "Jane", "Mindy", "Lana" };
		vector<vector<int>> newFriends = {
			//0, 1, 2, 3, 4
			{ 0, 0, 1, 0, 1 },  //0 Bill
			{ 0, 0, 1, 1, 1 },  //1 Cinderella
			{ 1, 1, 0, 0, 0 },  //2 Jane	
			{ 0, 0, 0, 0, 1 },  //3 Mindy
			{ 1, 0, 0, 1, 0 },  //4 Lana
		};
		cout << "\nCreate new graph: Graph newGraph(graph);\n";
		Graph newGraph(5);
		newGraph.createGraph(newFriends, newPeople);
		cout << "\nPrint old graph...\n";
		print(graph, people);
		cout << "\nPrint new graph...\n";
		print(newGraph, newPeople);
		cout << "\nMove old graph into new graph...\n";
		newGraph = move(graph);
		cout << "\nPrint new graph...\n";
		print(newGraph, people);
		cout << "\n*** NOTE: Try it again, but this time "
			<< "uncomment the next two statements.\n";
		//cout << "\nPrint old graph...\n"; // should crash the program
		//print(graph, people);
	}


	cout << endl;
	system("Pause");
	return 0;
}

void print(const Graph& graph, const vector<string>& people)
{
	cout << "MEMBERS: ";
	graph.printVertices();

	cout << "\nFRIENDS\n"; // \n 
	for (const string& i : people)
		graph.printAdjacentVertices(i);
}

void setUpGraph(const vector<string>& people,
	const vector<vector<int>>& friends, Graph& graph)
{
	graph.createGraph(friends, people);
	cout << "MEMBERS: ";
	graph.printVertices();

	cout << "\nFRIENDS\n"; // \n 
	for (const string& i : people)
		graph.printAdjacentVertices(i);
}