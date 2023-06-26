#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char *c = malloc(sizeof(char) * 6);
    strcpy(c, "Hello");

    printf("%s\n", c);
    free(c);
}
