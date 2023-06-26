#include <stdio.h>

int main() {
    int a = 1;
    int *pointer_a = &a; // Dirección de memoria RAM
    int *another_pointer = pointer_a;
    *pointer_a = 5;

    printf("Valor del puntero: %p\n", pointer_a); // 0x7ffc74ae71b4
    printf("Valor donde apunta: %i\n", *pointer_a); // 5
    printf("Valor de otro puntero: %p\n", another_pointer); // 0x7ffc74ae71b4
    printf("Valor donde apunta: %i\n", *another_pointer); // 5
}