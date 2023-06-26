#include <stdio.h>
#include <stdlib.h>

int main() {
    int length = 8;
    int *array = malloc(sizeof(int) * length);

    for (int i = 0; i < length; i++) {
        array[i]= i + 1;
    }
    for (int i = 0; i < length; i++) {
        printf("Valor de array[%i] = %i\n", i, array[i]);
    }

    array[100000] = 5;

    free(array);
}
