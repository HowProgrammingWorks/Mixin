class Mixin(object):
    def test(self):
        return 'Mixin'
 
class Class1(Mixin):
    pass
 
class Class2(Mixin):
    def test(self):
        return 'Class2'
 
class MainClass(Class1,Class2):
    pass
 
# order: MainClass -> Class1 -> Class2 -> Mixin
print(MainClass().test()) # Class2
