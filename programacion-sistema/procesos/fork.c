#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main() {
    int var = 5;
    int result = fork();
    
    if (result != 0) {
        printf("Proceso padre, valor %i\n", var);
        var = 1;
    } else {
        printf("Proceso hijo, valor %i\n", var);
    }
    // printf("Esto lo ejecuta el padre y el hijo\n");
}