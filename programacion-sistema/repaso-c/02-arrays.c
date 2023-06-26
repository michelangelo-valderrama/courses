#include <stdio.h>
#include <stdlib.h>

int main() {
  int *array = malloc(sizeof(int) * 8); // Memory Alloc

  printf("%p; %li\n", array, sizeof(array));
  printf("int: %li || long: %li,\n", sizeof(int), sizeof(long));
  for (int i = 0; i < 8; i++) {
    array[i] = i + 1;
    printf("Valor de array[%i] = %i\n", i, array[i]);
  }
  array[100000000000] = 4;
  free(array); // Libera el espacio de memoria
}