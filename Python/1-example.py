class Mixin:
	"""
	Mixin class
	"""
	par = 0

	def outputMethod(self):
		print('Mixin method')

class Test1(Mixin):
	"""
	Test1 has its own functions and Mixin's class functional
	"""
	def meth1(self):
		print('First method')

class Test2(Test1, Mixin):
	"""
	Test2 has its own functions, Test1 and Mixin's class functional
	"""
	def meth2(self):
		print('Second method')


instance1 = Test1()
instance1.meth1()
instance1.outputMethod()

print("")

instance2 = Test2()
instance2.meth1()
instance2.meth2()
instance2.outputMethod()
