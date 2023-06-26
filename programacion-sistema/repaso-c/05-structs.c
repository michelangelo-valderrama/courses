#include <stdio.h>
#include <stdlib.h>

struct Node {
    int value;
    struct Node *next;
};


int main() {
    struct Node *head = malloc(sizeof(struct Node));
    head->value = 1;
    head->next = malloc(sizeof(struct Node));
    head->next->value = 2;
    head->next->next = malloc(sizeof(struct Node));
    head->next->next->value = 3;

    printf("Dirección del primer nodo: %p\n", head); // 0x562785fb92a0
    printf("Valor del primer nodo: %i\n", head->value); // 1
    printf("--------------------------\n");
    printf("Dirección del primer nodo: %p\n", head->next); // 0x562785fb92c0
    printf("Valor del primer nodo: %i\n", head->next->value); // 2
    printf("--------------------------\n");
    printf("Dirección del primer nodo: %p\n", head->next->next); // 0x562785fb92e0
    printf("Valor del primer nodo: %i\n", head->next->next->value); // 3
}
