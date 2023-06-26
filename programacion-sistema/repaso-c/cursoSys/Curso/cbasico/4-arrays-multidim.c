#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char **strings = malloc(sizeof(char*) * 2);
    char *msg1 = malloc(sizeof(char) * 8);
    char *msg2 = malloc(sizeof(char) * 8);

    char c[][8] = {"Hello", "Mensaje"};

    strcpy(msg1, "Hola");
    strcpy(msg2, "Mensaje");

    strings[0] = msg1;
    strings[1] = msg2;

    printf("%s\n", strings[0]);
    printf("%s\n", strings[1]);
}
