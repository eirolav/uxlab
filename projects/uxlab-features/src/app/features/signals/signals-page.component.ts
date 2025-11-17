import { Component, computed, WritableSignal, Signal, signal, effect, EffectRef, Injector, runInInjectionContext } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, Observable} from 'rxjs';

@Component({
  selector: 'app-signals-components',
  templateUrl: './signals-page.component.html',
  styleUrl: './signals-page.component.scss',
  standalone: false
})
export class SignalsPageComponent {

    public count: WritableSignal<number> = signal(0);
    public logEffect: EffectRef;
    public logMessages: Array<string> = new Array<string>();
    
    
    // rxjs signal
    //public timer: any = null;
    
    public timer = toSignal(interval(1000), {initialValue: 0});
    public currentTime = computed(() => {
        
        console.log("Timer: ", this.timer());
        return (new Date(Date.now())).toLocaleTimeString();
    });

    public computedCount: Signal<string> = computed(() => {
        return 'This is the count: ' + this.count();
    })

    public constructor(private injector: Injector) {
        // Setup the effect - this is will trigger a call immediately as signal is subscribed to
        this.logEffect = effect(() => {
            this.setupEffect();
        });
    }

    public ngOnInit(){

    }

    public btnOnClick(event: any){
        this.count.update(value => {
            return value + 1;
        });
    }

    public btnDestroyEffect(event: any){
        this.logEffect.destroy();
    }

    public btnRenableEffect(event: any){
        // Effects have to be setup in injection contexts for DI. Can pass the injector and use this method to create effect when needed
        runInInjectionContext(this.injector, () => {
            this.logEffect = effect(() => {
                this.setupEffect();
            });
        });
    }

    private setupEffect(){
        this.logMessages.push("Effect triggered as count changed to: " + this.count());
    }
}
