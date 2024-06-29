#include <bits/stdc++.h>
using namespace std;

int main() {
    int N;
    char T;

    while (cin >> N >> T) {
        if (!(N >= 1 && N <= 26 && (T == 'a' || T == '1'))) {
            cout << "Invalid input" << endl;
            continue;
        }

        char startChar = (T == 'a') ? 'a' : '1';

        // First row
        for (int i = 0; i < N; i++) {
            cout << char(startChar + i);
        }
        cout << endl;

        // Middle rows
        for (int i = 1; i < N - 1; i++) {
            cout << char(startChar + i); // First character of the row

            // Spaces between the characters or numbers
            for (int j = 1; j < N - 1; j++) {
                cout << " ";
            }

            cout << char(startChar + N - 1 - i); // Last character of the row
            cout << endl;
        }

        // Last row
        for (int i = N - 1; i >= 0; i--) {
            cout << char(startChar + i);
        }
        cout << endl;
    }

    return 0;
}
