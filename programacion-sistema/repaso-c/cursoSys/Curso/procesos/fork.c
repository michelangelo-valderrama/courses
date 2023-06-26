#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main() {
    int variable = 1;
    for (int i = 0; i < 4; i++) {
        int result = fork();
        if (result != 0) {
            variable++;
            break;
        } else {
            variable += 2;
        }
    }
    printf("Soy el proceso %i, mi padre es %i, el valor es: %i\n", getpid(), getppid(), variable);
}
