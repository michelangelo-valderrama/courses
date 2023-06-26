#include <stdio.h>

int main() {
    int a = 5;
    int *pointer_a = &a;
    *pointer_a = 12;

    printf("Valor de puntero: %p\n", pointer_a);
    printf("Valor donde apunta: %i\n", *pointer_a);
}
