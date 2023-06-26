#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

#define SIZE 100

int num_threads;
int *array;
int *thread_result;

void *sum(void *arg) {
    int id = *(int*)arg;
    int nums_to_sum = SIZE / num_threads;
    int start = nums_to_sum * id;
    int end = start + nums_to_sum;

    if (id == num_threads - 1) {
        end = SIZE;
    }

    int sum = 0;
    for (int i = start; i < end; i++) {
        sum += array[i];
    }
    thread_result[id] = sum;
    printf("Hilo %i ha terminado con resultado: %i\n", id, sum);

    pthread_exit(0);
}

int main(int argc, char **argv) {
    if (argc != 2) {
        printf("Dame el numero de hilos\n");
        exit(-1);
    }

    num_threads = atoi(argv[1]);
    array = malloc(sizeof(int) * SIZE);
    thread_result = malloc(sizeof(int) * num_threads);

    for (int i = 0; i < SIZE; i++) {
        array[i] = i + 1;
    }

    pthread_t threads[num_threads];
    int thread_ids[num_threads];

    int total = 0;

    for (int i = 0; i < num_threads; i++) {
        thread_ids[i] = i;
        pthread_create(&threads[i], NULL, sum, (void*)&thread_ids[i]);
    }

    for (int i = 0; i < num_threads; i++) {
        pthread_join(threads[i], NULL);
        total += thread_result[i];
    }

    printf("Total = %i\n", total);

    free(array);
    free(thread_result);

}
