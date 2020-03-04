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

#define _CRTDBG_MAP_ALLOC
#include <stdlib.h>
#include <crtdbg.h>

using namespace std;

const int CAP = 10;

int main()
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
	// system("Pause");
	return 0;
}
