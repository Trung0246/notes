/*
	Tran, Trung
	Byun, Kloud
	Nguyen, Danny

	February 12, 2020

	CS A200
	Lab 2
*/

#include "Graph.h"

#include <iostream>
#include <queue>
using namespace std;

// Default constructor
Graph::Graph() {
	numOfVertices = 0;
	maxVertices = MAX_MATRIX_VERTICES;

	vertices = new string[maxVertices];
	
	matrix = new int* [maxVertices];
	for (int i = 0; i < maxVertices; ++i)
		matrix[i] = new int[maxVertices] {0};
}

// Overloaded constructor
Graph::Graph(int totalVertices) {
	numOfVertices = 0;
	maxVertices = totalVertices;

	vertices = new string[static_cast<size_t>(maxVertices)];

	matrix = new int* [static_cast<size_t>(maxVertices)];
	for (int i = 0; i < maxVertices; ++i)
		matrix[i] = new int[static_cast<size_t>(maxVertices)] {0}; //-V108 //-V697
}

Graph::Graph(const Graph& other) noexcept {
	numOfVertices = other.numOfVertices;
	maxVertices = other.maxVertices;

	vertices = new std::string[static_cast<size_t>(numOfVertices)];
	matrix = new int*[static_cast<size_t>(numOfVertices)];

	for (size_t i = 0; i < static_cast<size_t>(numOfVertices); ++i) {
		matrix[i] = new int[numOfVertices];
		vertices[i] = other.vertices[i];
		for (size_t j = 0; j < static_cast<size_t>(numOfVertices); ++j)
			matrix[i][j] = other.matrix[i][j];
	}
}
Graph& Graph::operator=(const Graph& other) noexcept {
	if (this == &other)
		std::cout << "Same Graph";
	else {
		Graph other2(other);
		this->~Graph();
		this->swap(other2);
	}
	return *this;
}

Graph::Graph(Graph&& other) noexcept : Graph() {
	*this = move(other);
}
Graph& Graph::operator=(Graph&& other) noexcept {
	if (this == &other)
		std::cout << "Same Graph";
	else {
		this->~Graph();
		numOfVertices = other.numOfVertices;
		maxVertices = other.maxVertices;
		other.numOfVertices = 0;
		other.maxVertices = 0;

		vertices = other.vertices;
		matrix = other.matrix;
		other.vertices = nullptr;
		other.matrix = nullptr;
	}
	return *this;
}

void Graph::swap(Graph& other) {
	std::swap(numOfVertices, other.numOfVertices);
	std::swap(maxVertices, other.maxVertices);
	std::swap(matrix, other.matrix);
	std::swap(vertices, other.vertices);
}

// createGraph
void Graph::createGraph(
	const vector<vector<int>>& graphData,
	const vector<string>& labels
) {
	numOfVertices = static_cast<int>(labels.size());
	if (numOfVertices > maxVertices) numOfVertices = maxVertices; // wtf is numOfVertices being used for?

	vertices = new std::string[static_cast<size_t>(numOfVertices)];
	matrix = new int*[static_cast<size_t>(labels.size())];

	for (size_t i = 0; i < static_cast<size_t>(numOfVertices); ++i) {
		matrix[i] = new int[numOfVertices];
		vertices[i] = labels.at(i);
		for (size_t j = 0; j < static_cast<size_t>(numOfVertices); ++j)
			matrix[i][j] = graphData.at(i).at(j);
	}
}

// printVertices
// Assume the list has at least one vertex.
void Graph::printVertices() const {
	for (size_t i = 0; i < static_cast<size_t>(numOfVertices); ++i)
		std::cout << vertices[i] << " ";
}

// printAdjacentVertices
// Assume the list has at least at least one vertex.
// Assume the vertex is somewhere in the list.
// Assume there is at least one adjacency.
void Graph::printAdjacentVertices(const string& vertex) const {
	for (size_t i = 0; i < static_cast<size_t>(numOfVertices); ++i)
		if (vertex == vertices[i]) {
			for (size_t j = 0; j < static_cast<size_t>(numOfVertices); ++j)
				if (matrix[j][i] == 1)
					std::cout << vertices[j] << " ";
			break;
		}
}

//printBFS
void Graph::printBFS(const string& vertex) const {
	size_t curr_proc_size = 0;
	
	queue<std::size_t> curr_index_column;
	size_t* curr_proc_same = new size_t[static_cast<size_t>(numOfVertices)]{};
	
	for (size_t i = 0; i < static_cast<size_t>(numOfVertices); ++i)
		if (vertex == vertices[i]) {
			curr_index_column.push(i);
			break;
		}

	while (curr_index_column.size() != 0) {
		size_t elem = curr_index_column.front();
		curr_proc_same[elem] = 1;
		for (size_t j = 0; j < static_cast<size_t>(numOfVertices); ++j)
			if (matrix[j][elem] == 1 && curr_proc_same[j] == 0 && j != elem) {
				curr_proc_same[j] = 1;
				curr_index_column.push(j);
			}
		cout << vertices[elem] << " ";
		curr_index_column.pop();
	}
	
	delete[] curr_proc_same;
}

// destructor
Graph::~Graph() {

	if (matrix != nullptr) {
		for (size_t i = 0; i < static_cast<size_t>(numOfVertices); ++i)
			delete[] matrix[i];
		delete[] matrix;
		matrix = nullptr;
	}
	if (vertices != nullptr) {
		delete[] vertices;
		vertices = nullptr;
	}
	// std::cout << "Track: " << track;
}


// std::size_t curr_proc_column[MAX_MATRIX_VERTICES] = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
// while (curr_index_column.size() != 0) {
// curr_proc_column[curr_proc_size++] = j;
//*
/*
while (curr_proc_size != 0) {
curr_index_column.push(*curr_proc_column);
for (
auto next1 = curr_proc_column, temp = curr_proc_column;
++next1 != curr_proc_column + curr_proc_size; ++temp
) *temp = *next1;
curr_proc_column[--curr_proc_size] = 0;
}
/*/
// size_t prev_proc_size = curr_proc_size;
//*/
/*/
while (curr_proc_size != 0) {
auto temp = curr_proc_column;
for (auto next1 = curr_proc_column; ++ next1 != curr_proc_column + curr_proc_size;)
if (vertices[*next1] < vertices[*temp]) temp = next1;
curr_index_column.push(*temp);
for (auto next1 = temp; ++ next1 != curr_proc_column + curr_proc_size; ++ temp)
*temp = *next1;
curr_proc_column[-- curr_proc_size] = 0;
}
//*/
/*
Bill Jane Jill Sean Martha Susan Cinderella
Cinderella Jill Martha Sean Susan Bill Jane
Jane Bill Martha Susan Jill Sean Cinderella
Jill Bill Cinderella Jane Sean Martha Susan
Martha Cinderella Jane Jill Sean Susan Bill
Sean Bill Cinderella Jane Jill Martha Susan
Susan Cinderella Jane Jill Martha Sean Bill
*/
// }