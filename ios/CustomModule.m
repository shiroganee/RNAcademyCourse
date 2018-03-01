#import "CustomModule.h"

@implementation CustomModule

RCT_EXPORT_MODULE();

BOOL hasListeners;
NSArray *nativeModuleList;

+(void) initialize {
  nativeModuleList = @[@"This", @"is", @"Native", @"Module"];
}

-(NSArray<NSString *> *)supportedEvents {
  return @[@"BASIC_LISTENER"];
}

-(void)startObserving {
  hasListeners = true;
}

-(void)stopObserving {
  hasListeners = false;
}

-(void) dateFunc:(NSTimer *)timer {
  NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
  [formatter setDateFormat: @"dd-MM-yyyy HH:mm:ss"];
  
  NSDate *currentDate = [NSDate date];
  NSString *dateString = [formatter stringFromDate:currentDate];
  
  [self sendEventWithName:@"BASIC_LISTENER" body:@{@"date": dateString}];
}

-(void) eventEmitter {
  NSTimer *timer = [NSTimer timerWithTimeInterval:0.5 target:self selector:@selector(dateFunc:) userInfo:nil repeats:YES];
  [[NSRunLoop mainRunLoop] addTimer:timer forMode:NSRunLoopCommonModes];
}

RCT_EXPORT_METHOD(startListening) {
  [self eventEmitter];
}

RCT_EXPORT_METHOD(getModuleList: (RCTResponseSenderBlock)callback) {
  callback(@[[NSNull null], nativeModuleList]);
}

RCT_REMAP_METHOD(getModuleListAsync, findEventsWithResolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  if (hasListeners) {
    resolve(nativeModuleList);
  } else {
    reject(@"NoListenersAttached", @"There is no listener attached", nil);
  }
}

@end
