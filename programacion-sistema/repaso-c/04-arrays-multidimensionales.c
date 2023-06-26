#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
  // char c[][5] = {"Hola", "Mundo"};
  // printf("%s\n", c[0]);
  // printf("%s\n", c[1]);
  char **strings = malloc(sizeof(char*) * 2);
  char *msg1 = malloc(sizeof(char) * 8);
  char *msg2 = malloc(sizeof(char) * 8);
  strcpy(msg1, "Hola");
  strcpy(msg2, "Mundo");
  strings[0] = msg1;
  strings[1] = msg2;

  printf("%s\n", strings[0]);
  printf("%s\n", strings[1]);
}